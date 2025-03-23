import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function POST(request) {
    const { email } = await request.json();

    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);



    const { data, error } = await supabase
    .from('profiles')
    .select('id, otp_attempts, last_otp_request_at, is_otp_timestamp_locked')
    .eq('email', email)

    if (error) {
        return NextResponse.json({ error: "Error querying database" }, { status: 500 });
    }

    if (!data || data.length === 0) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const user = data[0];
    const currentTime = Date.now();
    const twelveMilliseconds = 1000 * 60 * 12; // 12 seconds in ms
    const otpRequestTime = user.last_otp_request_at ? new Date(user.last_otp_request_at).getTime() : 0;



    
    let isInCoolDown;
    



    // Check if OTP attempts >= 
    if (user.otp_attempts >= 1) {

        // set flag to true
        isInCoolDown = true;


        // set cooldown timestamp
        if (!user.is_otp_timestamp_locked) {
            const { data, error: timestampError } = await supabase
                .from('profiles')
                .update({
                    last_otp_request_at: new Date().toISOString()
                })
                .eq('id', user.id)
                .select()

            // console.log("Timestamp Result:", data);

            if (timestampError) {
                return NextResponse.json({ message: "Error updating last_otp_request_at" }, { status: 500 });
            }
        }


        

        // set is_otp_timestamp_locked flag to true to prevent timestamp recreation
        const { error: flagError } = await supabase
            .from('profiles')
            .update({
                is_otp_timestamp_locked: true
            })
            .eq('id', user.id)
            .select()
 
        if (flagError) {
            return NextResponse.json({ message: "Error updating last_otp_request_at" }, { status: 500 });
        }





        // cooldown
        if (isInCoolDown) {
            const timeElapsed = currentTime - otpRequestTime;
            if ( timeElapsed < twelveMilliseconds) {
                const timeLeft = twelveMilliseconds - timeElapsed;
                const minutesLeft = Math.floor(timeLeft / 60000);
                const secondsLeft = Math.floor((timeLeft % 60000) / 1000);

                return NextResponse.json({
                    message: `To prevent spam and abusive behavior cooldown is active. You must wait ${minutesLeft}m ${secondsLeft}s before you can request a new verification code.`,
                    minutesLeft,
                    secondsLeft,
                }, { status: 401 });
            }

        }


   
        isInCoolDown = false;



    


    


    

    }

    // this runs after cooldown has expired check for one otp_attempt greater to ensure it only updates after cooldown expires
    if (user.otp_attempts >= 2 && !isInCoolDown) {
        console.log(isInCoolDown)
        console.log('cool down is not active')

        const { error: error } = await supabase
            .from('profiles')
            .update({
                otp_attempts: 1,
                is_otp_timestamp_locked: false
            })
            .eq('id', user.id);

        if (error) {
            return NextResponse.json({ message: "Error updating last_otp_request_at" }, { status: 500 });
        }
    } else {

        // Increment OTP attempts for valid requests
        const updatedOtpAttempts = user.otp_attempts + 1;

        const { error: updateError } = await supabase
            .from('profiles')
            .update({ otp_attempts: updatedOtpAttempts })
            .eq('id', user.id);

        if (updateError) {
            return NextResponse.json({ error: "Error updating otp_attempts" }, { status: 500 });
        }
    }









    return NextResponse.json({ message: "OTP request allowed" }, { status: 200 });

}
