import { Col, Row, Statistic } from 'antd';
import CountUp from 'react-countup';
import classNames from 'classnames/bind';

import styles from './Statistical.module.scss';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';
import { RiseOutlined } from '@ant-design/icons';
import { useEffect, useMemo, useState } from 'react';
import Loading from '../Loading/Loading';
import { TYPE_PRODUCT } from '../../constants';

const cx = classNames.bind(styles);

function Statistical({ isLoading, data }) {
    const [sum, setSum] = useState(0);
    const formatter = (value) => <CountUp end={value} separator="," />;

    const initialValue = useMemo(
        () =>
            TYPE_PRODUCT.map((type) => ({
                name: type,
                revenue: 0,
                sold: 0,
                inventory: 0,
            })),
        [],
    );
    useEffect(() => {
        if (data) {
            data?.forEach((product) => {
                const existedElement = initialValue.find((type) => type.name === product.type);
                if (existedElement) {
                    existedElement.revenue += product.sold * product.price;
                    existedElement.sold += product.sold;
                    existedElement.inventory += product.countInStock;
                }
            });
            setSum((initialValue.sum = initialValue?.reduce((acc, curr) => acc + curr.revenue, 0)));
        }
    }, [data, initialValue]);

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#00FF00', '#33FFFF', '#9999FF'];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <Loading isLoading={isLoading}>
            <div className={cx('wrapper')}>
                <div className={cx('wrapper-statistic')}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Statistic
                                title="Tổng doanh thu"
                                value={sum}
                                formatter={formatter}
                                className={cx('content-statistic')}
                                suffix={<RiseOutlined />}
                            />
                        </Col>
                        <Col span={12}>
                            <Statistic
                                title="Tổng doanh thu theo tuần"
                                value={81128}
                                precision={2}
                                formatter={formatter}
                                className={cx('content-statistic')}
                                suffix={<RiseOutlined />}
                            />
                        </Col>
                    </Row>
                </div>

                <div className={cx('wrapper-container')}>
                    <div className={cx('container-pie-chart')}>
                        <div className={cx('wrapper-pie-chart')}>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart width={400} height={400}>
                                    <Pie
                                        data={initialValue}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={renderCustomizedLabel}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="sold"
                                    >
                                        {initialValue.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className={cx('name-pie-chart')}>SỐ SẢN PHẨM BÁN ĐƯỢC THEO TỪNG LOẠI</div>
                    </div>

                    <div className={cx('container-pie-chart')}>
                        <div className={cx('wrapper-pie-chart')}>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart width={400} height={400}>
                                    <Pie
                                        data={initialValue}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={renderCustomizedLabel}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="inventory"
                                    >
                                        {initialValue.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className={cx('name-pie-chart')}>SỐ SẢN PHẨM MỖI LOẠI TRONG KHO</div>
                    </div>
                </div>

                <div className={cx('wrapper-simple')}>
                    <div className={cx('wrapper-simple-content')}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                width={500}
                                height={300}
                                data={initialValue}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="pv" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                                <Bar
                                    dataKey="revenue"
                                    fill="#82ca9d"
                                    activeBar={<Rectangle fill="gold" stroke="purple" />}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className={cx('name-simple')}>TỔNG DOANH THU THEO TỪNG LOẠI</div>
                </div>
            </div>
        </Loading>
    );
}

export default Statistical;
