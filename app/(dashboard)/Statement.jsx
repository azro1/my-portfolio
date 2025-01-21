const Statement = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-6 p-6 uw:p-10 bg-slateOnyx ">

            <div className="bg-nightSky w-max mx-auto p-2 ">
                <h2 className="subheading font-b text-saddleBrown ">My Mission</h2>
            </div>

            <div className="flex items-center justify-center bg-nightSky p-6">
                <div className="text-center ">
                    <p className="text-ashGray text-lg ">
                        My mission is to craft intuitive, efficient, and user-focused digital solutions. Through a blend of innovative thinking 
                        and technical expertise, I strive to create software that solves real-world problems, empowers users, and brings ideas 
                        to life with precision and creativity.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Statement;
