import { Upload, Button, message } from "antd";
import { UploadOutlined, FilePdfOutlined } from "@ant-design/icons";
import { UploadChangeParam, UploadFile } from "antd/es/upload/interface";
import { useEffect, useState } from "react";
import React from "react";

interface FileUploadProps {
  onFileChange: (file: File) => void;
}

const FileUpload = ({ onFileChange }: FileUploadProps) => {
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (fileUrl) URL.revokeObjectURL(fileUrl);
    };
  }, [fileUrl]);

  const handleChange = (info: UploadChangeParam<UploadFile>) => {
    const { file } = info;

    if (file.status === "done" && file.originFileObj) {
      onFileChange(file.originFileObj);
      const objectUrl = URL.createObjectURL(file.originFileObj);
      setFileUrl(objectUrl);
      message.success("Arquivo enviado com sucesso!");
    } else if (file.status === "error") {
      message.error("Falha ao enviar o arquivo!");
    }
  };

  return (
    <Upload
      name="file"
      showUploadList={false}
      customRequest={(options) => {
        const file = options.file as UploadFile;
        if (file.originFileObj) {
          onFileChange(file.originFileObj);
          const objectUrl = URL.createObjectURL(file.originFileObj);
          setFileUrl(objectUrl);
          message.success("Arquivo carregado com sucesso!");
        }
      }}
      onChange={handleChange}
    >
      <Button icon={<UploadOutlined />}>Carregar Anexo</Button>
      {fileUrl && (
        <div style={{ marginTop: 10 }}>
          <a href={fileUrl} target="_blank" rel="noopener noreferrer">
            <FilePdfOutlined /> Visualizar PDF
          </a>
        </div>
      )}
    </Upload>
  );
};

export default FileUpload;
