import React from 'react';
import {
  Card, Form, Row, Input, Button,
} from 'antd';

const { TextArea } = Input;

const MessageForm = (props: { handleSendMessage: (contentText: string) => void }) => {
  const { handleSendMessage } = props;
  const [form] = Form.useForm();
  const handleSend = (values: { contentText: string }) => {
    handleSendMessage(values.contentText);
    form.resetFields();
  };
  return (
    <Card
      size="small"
    >
      <Form
        form={form}
        name="comment form"
        layout="vertical"
        onFinish={handleSend}
        scrollToFirstError
      >
        <Row>
          <Row style={{ width: '100%' }}>
            <Form.Item
              style={{ width: '100%' }}
              name="contentText"
              rules={[
                { min: 1, message: 'Message should be at least 3 character long.' },
                { required: true, message: 'Please, input your username!' },
              ]}
            >
              <TextArea showCount autoSize maxLength={500} />
            </Form.Item>
          </Row>
          <Row style={{ width: '100%' }}>
            <Form.Item
              style={{ margin: '0px 0px 0px auto' }}
            >
              <Button
                type="primary"
                htmlType="submit"
              >
                Send
              </Button>
            </Form.Item>
          </Row>
        </Row>
      </Form>
    </Card>
  );
};

export default MessageForm;
