import { Avatar, Card } from 'antd';
import Meta from 'antd/es/card/Meta';

function LoadingPage({ loading }) {
    return (
        <div style={{ display: 'flex' }}>
            <Card
                style={{
                    width: 350,
                    marginTop: 16,
                }}
                loading={loading}
            >
                <Meta
                    avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />}
                    title="Card title"
                    description="This is the description"
                />
            </Card>
            <Card
                style={{
                    width: 300,
                    marginTop: 16,
                }}
                loading={loading}
            >
                <Meta
                    avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />}
                    title="Card title"
                    description="This is the description"
                />
            </Card>
            <Card
                style={{
                    width: 300,
                    marginTop: 16,
                }}
                loading={loading}
            >
                <Meta
                    avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />}
                    title="Card title"
                    description="This is the description"
                />
            </Card>
            <Card
                style={{
                    width: 300,
                    marginTop: 16,
                }}
                loading={loading}
            >
                <Meta
                    avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />}
                    title="Card title"
                    description="This is the description"
                />
            </Card>
            <Card
                style={{
                    width: 300,
                    marginTop: 16,
                }}
                loading={loading}
            >
                <Meta
                    avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />}
                    title="Card title"
                    description="This is the description"
                />
            </Card>
            <Card
                style={{
                    width: 300,
                    marginTop: 16,
                }}
                loading={loading}
            >
                <Meta
                    avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />}
                    title="Card title"
                    description="This is the description"
                />
            </Card>
            <Card
                style={{
                    width: 300,
                    marginTop: 16,
                }}
                loading={loading}
            >
                <Meta
                    avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />}
                    title="Card title"
                    description="This is the description"
                />
            </Card>
            <Card
                style={{
                    width: 300,
                    marginTop: 16,
                }}
                loading={loading}
            >
                <Meta
                    avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />}
                    title="Card title"
                    description="This is the description"
                />
            </Card>
        </div>
    );
}

export default LoadingPage;
