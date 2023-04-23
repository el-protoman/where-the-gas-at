import Head from 'next/head';
import { Container, Row, Col } from 'react-bootstrap';
import Layout_Component from '../components/layout';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Gas Availability App</title>
        <meta name="description" content="Find gas stations near you" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Container fluid>
          <Row>
            <Col xs={12} md={6}>
            </Col>
            <Col xs={12} md={6}>
              <Layout_Component />
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
}
