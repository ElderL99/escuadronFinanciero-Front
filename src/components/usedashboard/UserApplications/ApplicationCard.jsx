import ApplicationHeader from "./ApplicationHeader";
import ApplicationInfo from "./ApplicationInfo";
import ApplicationDetails from "./ApplicationDetails";

export default function ApplicationCard({ app, onClick, isDetail }) {
  return (
    <article
      onClick={onClick}
      className={`bg-white/80 backdrop-blur-xl rounded-xl p-5 border border-[#611232]/10 shadow-sm hover:shadow-md transition-all duration-200 ${
        !isDetail ? "cursor-pointer hover:scale-[1.02]" : ""
      }`}
    >
      <ApplicationHeader app={app} />
      <ApplicationInfo app={app} />
      {isDetail && <ApplicationDetails app={app} />}
    </article>
  );
}
