import React from 'react';
import { Row, Col, Card, List, Typography, Tabs, Statistic } from 'antd';
import { FileTextOutlined, BellOutlined, PieChartOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const Dashboard = () => {
  const quickLinks = [
    'Bangalore - Mumbai',
    'Bangalore - Chennai',
    'Bangalore - Hyderabad',
    'Bangalore - Goa',
    'Bangalore - Banda',
    'Bangalore - Belgaum',
  ];

  const quickReports = [
    'Agent Collection Details Report',
    'Online Branch/Agent Collection',
    'Occupancy Report',
    'Branch Collection Report',
    'Show Manage Agent Account Link in Account',
    'User Wise Collection Report',
    'SMS USAGE Reports',
  ];

  return (
    <div>
      <Row gutter={[16, 16]}>
        {/* Hot Offers / News */}
        <Col xs={24} md={12}>
          <Card 
            title={<span><BellOutlined /> Hot Offers / News</span>} 
            style={{ height: '100%' }}
            bodyStyle={{ minHeight: 300 }}
          >
            <Title level={5}>Welcome To Unique Travels</Title>
            <Text>User</Text>
          </Card>
        </Col>

        {/* Booking Summary */}
        <Col xs={24} md={12}>
          <Card 
            title={<span><PieChartOutlined /> Your Booking Summary</span>} 
            style={{ height: '100%' }}
            bodyStyle={{ minHeight: 300 }}
          >
            <Tabs defaultActiveKey="1" items={[
              { key: '1', label: 'My Activity', children: (
                <div style={{ textAlign: 'right' }}>
                  <div><span style={{ color: '#faad14', marginRight: 8 }}>■</span>Bookings(0) - ₹0.00</div>
                  <div><span style={{ color: '#1890ff', marginRight: 8 }}>■</span>Cancelled(0) - ₹0.00</div>
                </div>
              )},
              { key: '2', label: 'Reservation', children: 'No Data' },
              { key: '3', label: 'Pending Tickets', children: 'No Data' },
              { key: '4', label: 'Cancellations', children: 'No Data' },
              { key: '5', label: 'Bima Pending Tickets', children: 'No Data' },
            ]} />
          </Card>
        </Col>

        {/* Quick Links */}
        <Col xs={24} md={12}>
          <Card 
            title={<span><FileTextOutlined /> Quick Links</span>} 
            style={{ height: '100%' }}
          >
            <List
              dataSource={quickLinks}
              renderItem={(item) => (
                <List.Item>
                  <a href="#">{item}</a>
                </List.Item>
              )}
            />
          </Card>
        </Col>

        {/* Quick Reports Widget */}
        <Col xs={24} md={12}>
          <Card 
            title={<span><FileTextOutlined /> Quick Reports Widget</span>} 
            style={{ height: '100%' }}
          >
            <List
              dataSource={quickReports}
              renderItem={(item) => (
                <List.Item>
                  <Typography.Text>• {item}</Typography.Text>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
