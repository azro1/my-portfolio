import Heading from "@/app/components/Heading";

const RulesMessage = () => {
    return (
      <div className="bg-cloudGray p-4 rounded-lg mb-8">
        <Heading className="font-b mb-2 text-deepCharcoal text-xl">
          Chat Room Rules
        </Heading>
        <ol className="list-decimal list-inside text-deepCharcoal leading-normal">
          <li>🤝 Be respectful to other users.</li>
          <li>🚫 Do not spam or flood the chat.</li>
          <li>⚠️ Do not post any offensive or inappropriate content.</li>
          <li>👮‍♂️ Follow the instructions of the moderators.</li>
        </ol>
      </div>
    );
  };
  
  export default RulesMessage;
  