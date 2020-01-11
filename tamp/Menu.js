import "../public/css/Menu.css";
export default function Menu() {
  return (
    <nav class="navbar navbar-light navbar-expand-md fixed-top bg-light shadow">
      <div class="container">
        <button
          data-toggle="collapse"
          class="navbar-toggler"
          data-target="#navcol-1"
        >
          <span class="sr-only">Toggle navigation</span>
          <span class="navbar-toggler-icon"></span>
        </button>
        <a href="/huong-dan">
          <p class="textColor text-uppercase font-weight-bold my-auto mx-3">
            Cách Chưng Yến Sào?
          </p>
        </a>

        <div class="collapse navbar-collapse" id="navcol-1">
          <ul class="nav navbar-nav">
            <img
              class="mx-auto"
              style="width: 40px;height:40px;"
              src="/assets/img/yensao.jpg"
            />
            <li class="nav-item mx-auto" role="presentation">
              <a class="nav-link text-center" href="/">
                TRANG CHỦ
              </a>
            </li>
            <li class="nav-item mx-auto" role="presentation">
              <a class="nav-link text-center" href="/huong-dan">
                CÁCH CHƯNG
              </a>
            </li>
            <li class="nav-item mx-auto" role="presentation">
              <a class="nav-link text-center" href="/san-pham">
                SẢN PHẨM
              </a>
            </li>
            <li class="nav-item mx-auto" role="presentation">
              <a class="nav-link text-center" href="/thi-cong">
                {" "}
                THI CÔNG
              </a>
            </li>
            <li class="nav-item mx-auto" role="presentation">
              <a class="nav-link text-center" href="/tin-tuc">
                TIN TỨC
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
