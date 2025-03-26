import { FiPhone, FiMail, FiMapPin} from 'react-icons/fi';

const ContactInfo = () => {
    return (
        <div>
            <ul>
                <li className='flex gap-3 pb-3'>
                    <FiPhone size={20} className='text-goldenRod' aria-label='Phone' />
                    <p>+447455 132 994</p>
                </li>
                <li className='flex gap-3 pb-3'>
                    <FiMail size={20} className='text-goldenRod' aria-label="Email" />
                    <p>azro1.development@gmail.com</p>
                </li>
                <li className='flex gap-3 pb-3'>
                    <FiMapPin size={20} className='text-goldenRod' aria-label="Address" />
                    <p>Sienna Court, New Southgate, London N11 2RG</p>
                </li>
            </ul>

            <div className='mt-1 relative h-44 w-full sm:w-4/5 md:w-full'>
                <iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d2477.512962604341!2d-0.13284128788590113!3d51.61381197172027!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNTHCsDM2JzQ5LjciTiAwwrAwNyc0OC45Ilc!5e0!3m2!1sen!2suk!4v1712056886513!5m2!1sen!2suk" style={{ width: "100%", height: "100%", border: "0", borderRadius: '6px', filter: "invert(86%) contrast(86%) grayscale(1)" }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </div>
    )
}

export default ContactInfo
