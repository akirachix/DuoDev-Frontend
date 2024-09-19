import Orders from "./recyclers/orders/page";
import Layout from "./Components/Layout";

export default function Home() {
  return (
    <div>
      <Layout>
          <div>
            <Orders/>

          </div>
      </Layout>
      
    </div>
  );
}
