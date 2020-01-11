import "../public/css/main.css";
import Head from "Head";
import Header from "../components/Header";
import Divide from "../components/Divide";
import Menu from "../components/Menu";
import GioiThieu from "../components/GioiThieu";
import CamKet from "../components/CamKet";
import ThiCong from "../components/ThiCong";
import Product from "../components/Product";
import ReviewBlog from "../components/ReviewBlog";
export default function Banner() {
  return (
    <div>
      <Head>
        <Header />
        <meta
          name="google-site-verification"
          content="92OCPTjF4-QATaH1JnBWCDUVA-0Wwv2oGnQhQv7Vf0I"
        />
        <meta
          name="description"
          content="Tổ Yến Trên Đá Tự Nhiên Được Làm Sạch Thủ Công. Khai Thác Từ Hệ Thống Hang Nhân Tạo Của Yến Sào Đất Quảng"
        />
        <meta
          name="keywords"
          content="yen sao dat quang, yen sao, yen, yen sao quang nam, yen quang nam, to yen tho, yen tho, to yen tho quang nam"
        />
        <title>Yến Sào Đất Quảng | Nam Hội An</title>
      </Head>
      <Menu />
      <img
        className="w-100 mainBanner"
        alt="Hình ảnh sơ chế tổ yến"
        src="/assets/img/gia-cong-1.jpg"
      />
      <main className="mainContent">
        <GioiThieu />
        <Divide />
        <CamKet />
        <Divide />
        <ThiCong />
        <Divide />
        <Product />
        <Divide />
        <ReviewBlog />
      </main>
      <Footer />
    </div>
  );
}
