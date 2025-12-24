import React, { useState, useEffect } from 'react';
import { Row, Col, Card, DatePicker, Select, Button, Typography, Skeleton, Empty, message } from 'antd';
import { SearchOutlined, FilterOutlined } from '@ant-design/icons';
import ServiceCard from './ServiceCard';
import { getReservations } from '../../api/reservations';
import dayjs from 'dayjs';

const { Title } = Typography;
const { Option } = Select;

const ServicesList = () => {
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState([]);
  const [filters, setFilters] = useState({
    date: dayjs(),
    origin: null,
    destination: null,
    route: null,
  });

  const fetchServices = async () => {
    setLoading(true);
    try {
      // Convert filters to API params
      const params = {
        travel_date: filters.date ? filters.date.format('YYYY-MM-DD') : undefined,
        origin: filters.origin,
        destination: filters.destination,
        route: filters.route,
      };
      
      const data = await getReservations(params);
      // Handle different API response structures
      const servicesList = Array.isArray(data) ? data : (data.data || []);
      setServices(servicesList);
    } catch (error) {
      message.error('Failed to load services');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []); // Initial load

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Title level={2} style={{ marginBottom: 16 }}>Scheduled Services</Title>
        
        {/* Filters Bar */}
        <Card bodyStyle={{ padding: 16 }} style={{ borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <Row gutter={[16, 16]} align="bottom">
            <Col xs={24} sm={12} md={5}>
              <div style={{ marginBottom: 8, fontWeight: 500 }}>Scheduled for</div>
              <DatePicker 
                style={{ width: '100%' }} 
                value={filters.date}
                onChange={(date) => handleFilterChange('date', date)}
                format="DD MMM YYYY"
              />
            </Col>
            
            <Col xs={24} sm={12} md={5}>
              <div style={{ marginBottom: 8, fontWeight: 500 }}>Origin</div>
              <Select 
                showSearch
                style={{ width: '100%' }} 
                placeholder="Show All"
                allowClear
                onChange={(val) => handleFilterChange('origin', val)}
              >
                <Option value="Bangalore">Bangalore</Option>
                <Option value="Chennai">Chennai</Option>
                <Option value="Hyderabad">Hyderabad</Option>
              </Select>
            </Col>

            <Col xs={24} sm={12} md={5}>
              <div style={{ marginBottom: 8, fontWeight: 500 }}>Destination</div>
              <Select 
                showSearch
                style={{ width: '100%' }} 
                placeholder="Show All"
                allowClear
                onChange={(val) => handleFilterChange('destination', val)}
              >
                <Option value="Bangalore">Bangalore</Option>
                <Option value="Chennai">Chennai</Option>
                <Option value="Hyderabad">Hyderabad</Option>
              </Select>
            </Col>

            <Col xs={24} sm={12} md={5}>
               <div style={{ marginBottom: 8, fontWeight: 500 }}>Route</div>
               <Select 
                 showSearch
                 style={{ width: '100%' }} 
                 placeholder="--ALL--"
                 allowClear
                 onChange={(val) => handleFilterChange('route', val)}
               >
                 <Option value="BLR-CHE">Bangalore - Chennai</Option>
                 <Option value="BLR-HYD">Bangalore - Hyderabad</Option>
               </Select>
            </Col>

            <Col xs={24} md={4} style={{ textAlign: 'right' }}>
              <Button 
                type="primary" 
                icon={<SearchOutlined />} 
                onClick={fetchServices}
                style={{ width: '100%', background: '#00b96b', borderColor: '#00b96b' }} // Green search button from screenshot
              >
                Search
              </Button>
            </Col>
          </Row>
        </Card>
      </div>

      {/* Services List */}
      <div style={{ minHeight: 400 }}>
        {loading ? (
          <>
            <Skeleton active avatar paragraph={{ rows: 4 }} />
            <Skeleton active avatar paragraph={{ rows: 4 }} style={{ marginTop: 24 }} />
            <Skeleton active avatar paragraph={{ rows: 4 }} style={{ marginTop: 24 }} />
          </>
        ) : services.length > 0 ? (
          services.map((service, index) => (
            <ServiceCard key={service.id || index} service={service} />
          ))
        ) : (
          <Empty description="No services found for the selected criteria" />
        )}
      </div>
    </div>
  );
};

export default ServicesList;
