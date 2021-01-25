import React from 'react';
import {
  Form, Input, Row, Upload, Button, notification,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { IPost, IPostEditedResponse, IResponse } from '../utils/interfaces';
import { setContentImage, setContentText } from '../slices/postPageSlice';
import api from '../utils/api';

const { TextArea } = Input;

const PostEditForm = (props: { item: IPost, handleCancel: () => void }) => {
  const { item, handleCancel } = props;
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const handleEdit = (values: { contentText: string, contentImage: any }) => {
    const formData = new FormData();
    formData.append('contentText', values.contentText);
    if (!values.contentImage?.file) {
      if (values.contentImage?.name) {
        formData.append('contentImage', values.contentImage.name);
      }
    } else {
      formData.append('contentImage', values.contentImage.file.originFileObj);
    }
    api.put(
      `/posts/id/${item.id}`,
      formData,
    ).then((response: { data: IPostEditedResponse }) => {
      notification.success({
        message: response.data.message,
        description: response.data.description,
      });
      const { contentText, contentImage } = response.data.data;
      dispatch(setContentText(contentText));
      dispatch(setContentImage(contentImage));
      handleCancel();
    }).catch((reason: { response: { data: IResponse } }) => {
      if (!reason.response || !reason.response.data) {
        notification.error({
          message: 'Internal Error.',
          description: 'Upps! Sorry, something went wrong in internal server.',
        });
        return;
      }
      notification.error({
        message: reason.response.data.message,
        description: reason.response.data.description,
      });
    });
  };

  return (
    <Form
      form={form}
      name="postform"
      layout="vertical"
      scrollToFirstError
      initialValues={{
        contentText: item.contentText,
      }}
      onFinish={handleEdit}
    >
      <Form.Item
        name="contentText"
      >
        <TextArea showCount autoSize maxLength={1000} />
      </Form.Item>
      <Row style={{ position: 'relative' }}>
        <Form.Item
          style={{ margin: 0, width: '100%' }}
          name="contentImage"
          valuePropName="contentImage"
        >
          <Upload
            name="contentImage"
            defaultFileList={(item.contentImage && [
              {
                uid: '1',
                name: item.contentImage as string,
                status: 'done',
                url: `http://localhost:8000/${item.contentImage}`,
                thumbUrl: `http://localhost:8000/${item.contentImage}`,
                type: 'picture',
                size: 0,
              },
            ]) || []}
            listType="picture"
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Upload image (Max: 1)</Button>
          </Upload>
        </Form.Item>
        <Form.Item style={{
          margin: 0,
          position: 'absolute',
          top: 0,
          right: 0,
        }}
        >
          <Button
            style={{ marginRight: 10 }}
            type="default"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            type="primary"
            htmlType="submit"
          >
            Save
          </Button>
        </Form.Item>
      </Row>
    </Form>
  );
};

export default PostEditForm;
