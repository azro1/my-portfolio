import Heading from "@/app/components/Heading";

const RulesMessage = () => {
    return (
      <div className="bg-charcoalGray p-4 rounded-lg mb-8">
        <Heading className="mb-2 underline decoration-[1px] underline-cloudGray underline-offset-4 text-cloudGray text-xl md:font-b md:no-underline">
          Chat Room Rules
        </Heading>
        <ol className="list-decimal list-inside text-frostWhite leading-relaxed">
          <li>🤝 Be respectful to other users.</li>
          <li>🚫 Do not spam or flood the chat.</li>
          <li>⚠️ Do not post any offensive or inappropriate content.</li>
          <li>👮‍♂️ Follow the instructions of the moderators.</li>
        </ol>
      </div>
    );
  };
  
  export default RulesMessage;
  