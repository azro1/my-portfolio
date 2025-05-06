import Heading from "@/app/components/Heading";

const RulesMessage = () => {
    return (
      <div className="bg-white p-4 rounded-md mb-8 md:p-6 md:rounded-lg">
        <Heading className="mb-1 text-nightSky font-bold text-lg md:text-xl md:mb-2">
          Chat Room Rules
        </Heading>
        <ol className="list-decimal list-inside text-ashGray md:leading-relaxed">
          <li>🤝 Be respectful to other users.</li>
          <li>🚫 Do not spam or flood the chat.</li>
          <li>⚠️ Do not post any offensive or inappropriate content.</li>
          <li>👮‍♂️ Follow the instructions of the moderators.</li>
        </ol>
      </div>
    );
  };
  
  export default RulesMessage;
  