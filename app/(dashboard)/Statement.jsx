// components
import Heading from "../components/Heading";

const Statement = () => {
    return (
        <div className="flex flex-col items-center justify-center ">

            <div className="w-max mx-auto mb-6">
                <Heading className="text-2xl md:text-4xl font-b text-ashGray">
                    My Mission
                </Heading>
            </div>

            <div className="flex items-center justify-center text-center bg-charcoalGray p-6 rounded-md">
                <p className="text-frostWhite md:text-lg leading-7">
                    My mission is to craft intuitive, efficient, and user-focused digital solutions. Through a blend of innovative thinking
                    and technical expertise, I strive to create software that solves real-world problems, empowers users, and brings ideas
                    to life with precision and creativity.
                </p>
            </div>
        </div>
    );
};

export default Statement;
