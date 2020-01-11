import "../public/css/main.css";
export default function CamKet() {
  return (
    <section data-aos="fade-up" className="mb-4">
      <div className="container">
        <div className="row">
          <div className="col-4 mb-4">
            <div className="demon pb-4">
              <div className="text-center">
                <img
                  className="mb-2"
                  style="width: 50px;"
                  src="/assets/img/Logo_Nau.png"
                />
                <h5>Tự Khai Thác</h5>
                <p className="text-justify">
                  Tổ Yến trên vách đá tự nhiên khai thác từ hệ thống hang nhân
                  tạo của công ty Yến Sào Đất Quảng.
                  <br />
                </p>
              </div>
              <img
                data-bs-hover-animate="bounce"
                className="w-100"
                src="/assets/img/nguon-goc-to-yen.jpg"
              />
            </div>
          </div>
          <div className="col-4 mb-4">
            <div className="demon pb-4">
              <div className="text-center">
                <img
                  className="mb-2"
                  style="width: 50px;"
                  src="/assets/img/Logo_Nau.png"
                />
                <h5>Làm Sạch Thủ Công</h5>
                <p className="text-justify">
                  Làm sạch sạch hoàn toàn thủ công bằng nhíp và nước sạch. Tổ
                  yến sau khi làm sạch nguyên chất, nguyên vị. Không có các
                  thành phần nào khác.
                  <br />
                </p>
              </div>
              <img
                data-bs-hover-animate="bounce"
                className="w-100"
                src="/assets/img/gia-cong.jpg"
              />
            </div>
          </div>
          <div className=" col-4 mb-4">
            <div className="demon pb-4">
              <div className="text-center">
                <img
                  className="mb-2"
                  style="width: 50px;"
                  src="/assets/img/Logo_Nau.png"
                />
                <h5>Sản Phẩm Đa Dạng</h5>
                <p className="text-justify">
                  Sản phẩm được đóng gói đa dạng, chia thành nhiều phân khúc.
                  Phục vụ được hầu hết các nhu cầu của người tiêu dùng.
                  <br />
                </p>
              </div>
              <img
                data-bs-hover-animate="bounce"
                className="w-100"
                src="/assets/img/giao-hang.jpg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
