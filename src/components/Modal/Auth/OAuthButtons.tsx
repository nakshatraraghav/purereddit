import { socials } from "@/assets/icons";

const OAuthButtons = () => {
  return (
    <div className="px-8 pt-2 mb-4 w-full">
      <button className="flex  items-center justify-between px-4 py-2 rounded-xl border-2 border-gray-500">
        <div className="text-sm">Sign Up With Twitter</div>
        <socials.twitter />
      </button>
      <button className="flex">
        <div className="text-sm">Sign Up With Github</div>
        <socials.github />
      </button>
    </div>
  );
};

export default OAuthButtons;
