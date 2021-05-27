import Link from "next/link";
import { useRouter } from "next/router";

const Languages = () => {
  const router = useRouter();
  const { pathname, asPath } = router;
  return (
    <>
      <Link href={pathname} as={asPath} locale="en">
        <a>
          <div className="hover:text-gray-900 px-2 py-1">ENGLISH</div>
        </a>
      </Link>
      <Link href={pathname} as={asPath} locale="vi">
        <a>
          <div className="hover:text-gray-900 px-2 py-1">VIETNAMESE</div>
        </a>
      </Link>
    </>
  );
};

export default Languages;
