import React from 'react';
import { Button ,message} from 'antd';
import jsPDF from 'jspdf';

const App: React.FC = () => {

  const generatePdf = () => {
    let doc = new jsPDF();
    // 生成大量的文本
let text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ';
for(let i = 0; i < 5000; i++) {
  text += 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ';
}

doc.text(text, 10, 10);
doc.save('large.pdf');
message.success(`文件生成功能`);
  };

  return(
    <div>
      <Button type="primary" onClick={generatePdf}>生成测试PDF文件</Button>
    </div>
  )
};

export default App;
