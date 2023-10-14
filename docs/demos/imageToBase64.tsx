import React, { useState ,useRef} from 'react';
import { Upload, message,Input ,Divider ,Flex ,Button} from 'antd';
import { InboxOutlined ,CopyOutlined} from '@ant-design/icons';

const { Dragger } = Upload;

const App: React.FC = () => {
  const [base64Image, setBase64Image] = useState('');

  const inputRef=useRef(null);


  const handleCopy = () => {
    if (inputRef.current) {
      inputRef.current.select();
      document.execCommand('copy');
      message.success('Copied to clipboard.');
    }
  };
const props = {
  name: 'file',
  multiple: false,
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {

      const file = info.file.originFileObj;
      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64Image(reader.result);
      };

      if (file) {
        reader.readAsDataURL(file);
      }

      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};

return (

  <div>
<Dragger {...props}>
    <p className="ant-upload-drag-icon">
      <InboxOutlined />
    </p>
    <p className="ant-upload-text">拖曳图片至此处，将图片转为base64格式</p>
    <p className="ant-upload-hint">
     只支持单图
    </p>
  </Dragger>

  {base64Image && (
    <div>
      <img src={base64Image} alt="Selected" style={{maxWidth:'100%'}}  />
      <Divider orientation="left">Code</Divider>
      <Flex gap="small">
      <Button type="primary" onClick={handleCopy} icon={<CopyOutlined />} >复制</Button>
      <Input value={base64Image} ref={inputRef} />
      </Flex>
      <Divider orientation="left">概述</Divider>


    </div>
  )}


  </div>
);

};

export default App;

