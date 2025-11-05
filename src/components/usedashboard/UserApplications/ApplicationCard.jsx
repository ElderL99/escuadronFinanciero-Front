import { memo } from "react";
import ApplicationHeader from "./ApplicationHeader";
import ApplicationInfo from "./ApplicationInfo";
import ApplicationDetails from "./ApplicationDetails";

function ApplicationCard({ app, onClick, isDetail }) {
  return (
    <article
      onClick={onClick}
      className={`bg-white/90 rounded-xl p-5 border border-[#611232]/10 shadow-sm 
      hover:shadow-md transition-transform transition-shadow duration-200 will-change-transform
      ${!isDetail ? "cursor-pointer hover:scale-[1.01]" : ""}`}
    >
      <ApplicationHeader app={app} />
      <ApplicationInfo app={app} />
      {isDetail && <ApplicationDetails app={app} />}
    </article>
  );
}

// 🧠 Memoizar para evitar re-render innecesario
export default memo(ApplicationCard);
