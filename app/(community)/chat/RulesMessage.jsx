import Heading from "@/app/components/Heading";

const RulesMessage = () => {
    return (
      <div className="bg-white p-4 rounded-md mb-8 md:rounded-lg md:bg-charcoalGray">
        <Heading className="mb-2 text-nightSky font-b text-xl md:text-cloudGray">
          Chat Room Rules
        </Heading>
        <ol className="list-decimal list-inside text-nightSky md:text-cloudGray md:leading-relaxed">
          <li>🤝 Be respectful to other users.</li>
          <li>🚫 Do not spam or flood the chat.</li>
          <li>⚠️ Do not post any offensive or inappropriate content.</li>
          <li>👮‍♂️ Follow the instructions of the moderators.</li>
        </ol>
      </div>
    );
  };
  
  export default RulesMessage;
  