import classNames from "classnames";
import Container from "components/Container";
import { useDropzone } from "react-dropzone";
import styles from "./styles.module.scss";

interface Props {
    onUpload: (file: File) => void;
}

const UploadSection = ({ onUpload }: Props) => {
    const onDrop = (files: File[]) => {
        if (files.length) {
            onUpload(files[0]);
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <Container className={styles["dropzone-uploader"]} title="Upload">
            <div
                className={classNames(styles["dropzone-uploader__input-wrapper"])}
                {...getRootProps()}>
                <input {...getInputProps()} />
                <div>Przeciągnij plik</div>
            </div>
        </Container>
    );
};

export default UploadSection;
