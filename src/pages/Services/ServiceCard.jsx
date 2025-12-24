import React from 'react';
import { Card, Row, Col, Typography, Tag, Button, Space, Tooltip, Progress } from 'antd';
import { 
  ArrowRightOutlined, 
  WifiOutlined, 
  ThunderboltOutlined, 
  ClockCircleOutlined,
  EnvironmentOutlined,
  InfoCircleOutlined
} from '@ant-design/icons';

const { Text, Title } = Typography;

const ServiceCard = ({ service }) => {
  // Destructure with default values to handle potential missing data
  const {
    service_number = 'N/A',
    bus_type = 'Bus',
    origin = 'Origin',
    destination = 'Destination',
    travel_date = new Date().toISOString(),
    departure_time = '00:00',
    arrival_time = '00:00', // Assuming API might provide this
    fare = '0',
    available_seats = 0,
    total_seats = 30,
    status = 'Active',
    amenities = ['WiFi', 'AC'], // Placeholder for amenities
    policies = ['E-Ticketing', 'M-Ticket'], // Placeholder for policies
  } = service || {};

  const occupancy = total_seats > 0 ? Math.round(((total_seats - available_seats) / total_seats) * 100) : 0;
  
  // Format date
  const dateObj = new Date(travel_date);
  const formattedDate = dateObj.toLocaleDateString('en-US', { 
    weekday: 'short', 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });

  return (
    <Card 
      hoverable
      style={{ 
        marginBottom: 16, 
        borderRadius: 12,
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        border: 'none',
        overflow: 'hidden'
      }}
      bodyStyle={{ padding: 24 }}
    >
      <Row gutter={[24, 16]} align="middle">
        {/* Left Section: Route & Bus Info */}
        <Col xs={24} md={8}>
          <Space direction="vertical" size={4} style={{ width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Tag color="orange" style={{ fontWeight: 'bold' }}>{service_number}</Tag>
              <Text type="secondary" style={{ fontSize: 12 }}>{bus_type}</Text>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 8 }}>
              <Title level={4} style={{ margin: 0 }}>{origin}</Title>
              <ArrowRightOutlined style={{ color: '#ff4d00' }} />
              <Title level={4} style={{ margin: 0 }}>{destination}</Title>
            </div>

            <Space size={4} style={{ marginTop: 8, flexWrap: 'wrap' }}>
              {policies.map(policy => (
                <Tag key={policy} color="blue" style={{ borderRadius: 10, fontSize: 10 }}>{policy}</Tag>
              ))}
            </Space>
          </Space>
        </Col>

        {/* Middle Section: Timing & Status */}
        <Col xs={24} md={8}>
          <Space direction="vertical" size={8} style={{ width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <Text type="secondary" style={{ fontSize: 12 }}>Departure</Text>
                <div style={{ fontSize: 18, fontWeight: 'bold' }}>{departure_time}</div>
                <Text type="secondary" style={{ fontSize: 12 }}>{formattedDate}</Text>
              </div>
              {/* Duration could go here if available */}
              <div style={{ textAlign: 'right' }}>
                 <Text type="secondary" style={{ fontSize: 12 }}>Status</Text>
                 <div>
                   <Tag color={status === 'Active' ? 'success' : 'error'}>{status}</Tag>
                 </div>
              </div>
            </div>
            
            <div>
               <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                 <Text type="secondary">Occupancy</Text>
                 <Text strong>{total_seats - available_seats} / {total_seats}</Text>
               </div>
               <Progress 
                 percent={occupancy} 
                 size="small" 
                 strokeColor="#ff4d00" 
                 trailColor="#f0f0f0"
                 showInfo={false}
               />
            </div>
          </Space>
        </Col>

        {/* Right Section: Actions */}
        <Col xs={24} md={8} style={{ textAlign: 'right' }}>
           <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 12, height: '100%', justifyContent: 'center' }}>
             <Space>
               {amenities.includes('WiFi') && <Tooltip title="WiFi"><WifiOutlined /></Tooltip>}
               {amenities.includes('AC') && <Tooltip title="AC"><ThunderboltOutlined /></Tooltip>}
             </Space>
             
             <Space>
               <Button type="default" style={{ borderRadius: 6 }}>View Chart</Button>
               <Button type="primary" style={{ background: '#ff4d00', borderColor: '#ff4d00', borderRadius: 6 }}>
                 Modify
               </Button>
             </Space>
           </div>
        </Col>
      </Row>
    </Card>
  );
};

export default ServiceCard;
