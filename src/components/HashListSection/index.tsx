import Container from "components/Container";
import { useEffect, useState } from "react";

interface Props {
    isSyncInProgress: boolean;
    uploadedFileHashes: string[];
}

const HashListSection = ({ uploadedFileHashes }: Props) => {
    const [prevUploadedFileHashesLength, setPrevUploadedFileHashesLength] = useState(uploadedFileHashes.length);

    useEffect(() => {
        setPrevUploadedFileHashesLength(uploadedFileHashes.length);
    }, [prevUploadedFileHashesLength, uploadedFileHashes.length]);

    return (
        <Container title="Lista przechowywanych hashów">
            <>
                    <>
                        {uploadedFileHashes.map((hash, index) => (
                            <div
                                key={hash}>
                                <span>---{index + 1}---</span>
                                <span>{hash}</span>
                            </div>
                        ))}
                    </>
                
            </>
        </Container>
    );
};

export default HashListSection;
