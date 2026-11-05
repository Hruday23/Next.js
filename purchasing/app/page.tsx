import HomeContent from "../components/home-content";
import en from "../messages/en.json";

export default function Home() {
  return <HomeContent messages={en.home} />;
}
