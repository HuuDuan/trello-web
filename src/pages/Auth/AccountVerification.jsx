import { useEffect, useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import PageLoadingSpinner from "~/components/Loading/PageLoadingSpinner";
import { verifyUserAPI } from "~/apis";

function AccountVerification() {
  // Lấy giá trị email và token từ URL
  let [searchParams] = useSearchParams();
  // const email = searchParams.get('email');
  // const token = searchParams.get('token');
  const { email, token } = Object.fromEntries([...searchParams]);

  // Tạo một biến state để biết được là đã verify tài khoản đã thành công hay chưa
  const [Verified, setVerified] = useState(false);

  // Gọi API để verify tài khoản
  useEffect(() => {
    if (email && token) {
      verifyUserAPI({ email, token }).then(() => {
        // Nếu verify thành công thì cập nhật state Verified thành true
        setVerified(true);
      });
    }
  }, [email, token]);

  // nếu url có vấn đề, không tồn tại 1 trong 2 tham số email hoặc token thì hiển thị thông báo lỗi
  if (!email || !token) {
    return <Navigate to="/404" />;
  }
  // nếu chưa verify xong thì hiển  loading
  if (!Verified) {
    return <PageLoadingSpinner caption="Verifying your account..." />;
  }

  // nếu verify thành công thì điều hướng về trang login
  return <Navigate to={`/login?verifiedEmail=${email}`} />;
}

export default AccountVerification;
