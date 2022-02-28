import Layout from "../components/layout";
import NotFoundContent from "../components/elements/NotFoundContent";

const NotFoundPage = ({ global }) => {
  return (
    <Layout Hero={() => null} global={global} mainClass="page-container">
      <NotFoundContent />
    </Layout>
  );
};

export default NotFoundPage;
