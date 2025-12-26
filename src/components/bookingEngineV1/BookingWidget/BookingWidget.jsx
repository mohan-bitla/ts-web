import React, { useMemo, useState } from 'react';
import { Select, DatePicker, Radio, Button } from 'antd';
import { SwapOutlined, SearchOutlined, EnvironmentFilled, UnorderedListOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import './BookingWidget.css';

const { Option } = Select;

const BookingWidget = ({
  cities,
}) => {
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [onwardDate, setOnwardDate] = useState(dayjs());
  const [returnDate, setReturnDate] = useState(null);
  const [isReturn, setIsReturn] = useState(false);
  const [code, setCode] = useState(null);

  const handleSwap = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  const handleTripTypeChange = (e) => {
    setIsReturn(e.target.value === 'return');
    if (e.target.value === 'onward') {
      setReturnDate(null);
    }
  };

  const originOptions = useMemo(() => {
    return cities.map((city) => ({
      value: city.cityId,
      label: city.cityName,
    }));
  }, [cities]);

  const destinationOptions = useMemo(() => {
    if (!origin) {
      return cities.map((city) => ({
        value: city.cityId,
        label: city.cityName,
      }));
    }

    return cities.filter((city) => city.cityId !== origin).map((city) => ({
      value: city.cityId,
      label: city.cityName,
    }));
  }, [cities, origin]);

  return (
    <div className="booking-widget-container">
      <div className="booking-widget">
        
        {/* Origin */}
        <div className="input-group origin-group">
          <label className="input-label">
            <EnvironmentFilled className="icon-red" /> Origin
          </label>
          <Select
            showSearch
            className="ant-select-custom"
            placeholder="All"
            value={origin}
            onChange={setOrigin}
            optionFilterProp="children"
          >
            {originOptions.map((option) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        </div>

        {/* Swap Button */}
        <div className="swap-container" onClick={handleSwap}>
          <SwapOutlined className="swap-icon" />
        </div>

        {/* Destination */}
        <div className="input-group destination-group">
          <label className="input-label">
            <EnvironmentFilled className="icon-red" /> Destination
          </label>
          <Select
            showSearch
            className="ant-select-custom"
            placeholder="All"
            value={destination}
            onChange={setDestination}
            optionFilterProp="children"
          >
            {destinationOptions.map((option) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        </div>

        {/* Onward Date */}
        <div className="input-group date-group">
          <div className="radio-label">
            <Radio 
              checked={!isReturn} 
              onChange={() => setIsReturn(false)}
            >
              Onward
            </Radio>
          </div>
          <DatePicker 
            className="ant-picker-custom"
            format="DD/MM/YYYY"
            value={onwardDate}
            onChange={setOnwardDate}
            allowClear={false}
          />
        </div>

        {/* Return Date */}
        <div className="input-group date-group">
          <div className="radio-label">
            <Radio 
              checked={isReturn} 
              onChange={() => setIsReturn(true)}
            >
              Return (Optional)
            </Radio>
          </div>
          <DatePicker 
            className="ant-picker-custom"
            format="DD/MM/YYYY"
            placeholder="DD/MM/YY"
            value={returnDate}
            onChange={setReturnDate}
            disabled={!isReturn}
          />
        </div>

        {/* Code */}
        <div className="input-group code-group">
          <label className="input-label">
            <UnorderedListOutlined className="icon-red" /> Code
          </label>
          <Select
            className="ant-select-custom"
            placeholder="-Select-"
            value={code}
            onChange={setCode}
          >
            <Option value="PROMO1">PROMO1</Option>
          </Select>
        </div>

        {/* Search Button */}
        <div className="search-group">
          <Button type="primary" className="search-button" icon={<SearchOutlined style={{ fontSize: '20px' }} />} />
        </div>

      </div>
    </div>
  );
};

export default BookingWidget;
