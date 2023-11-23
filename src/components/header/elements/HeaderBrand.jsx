import Link from "next/link";
import Image from "next/image";
// import { Logo } from "@/data/Common";
import logo from "../../../../public/images/logo/logo1.png";

const HeaderBrand = (props) => {
  return (
    <div className="header-brand">
      <Link href="/" className="logo">
        <Image
          src={props.light ? logo : logo}
          alt="Site Logo"
          height={40}
          width={150}
        />
      </Link>
    </div>
  );
};

export default HeaderBrand;
