// components
import Heading from "../components/Heading";

const Statement = () => {
    return (
        <div className="flex flex-col items-center justify-center ">

            <Heading className="text-2xl md:text-4xl font-light mb-4 text-ashGray md:mb-6">
                My Mission
            </Heading>

            <div className="flex items-center justify-center text-center bg-charcoalGray p-4 rounded-md md:p-6">
                <p className="hidden lg:block text-lg text-cloudGray leading-7 font-medium">
                    My mission is to craft intuitive, efficient, and user-focused digital solutions. Through a blend of innovative thinking
                    and technical expertise, I strive to create software that solves real-world problems, empowers users, and brings ideas
                    to life with precision and creativity.
                </p>
                <p className="text-cloudGray leading-7 font-medium lg:hidden">
                    My mission is to create intuitive, efficient, and user-focused solutions that solve real-world problems with creativity and technical expertise
                </p>
            </div>
        </div>
    );
};

export default Statement;
