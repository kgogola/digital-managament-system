import classNames from "classnames";
import Container from "components/Container";
import { useEthAccounts, useHashStorageContract } from "hooks";
import { useState } from "react";
import { EthDocument } from "types";
import { downloadIpfsFileAsync, getFileFromChainAsync, getIpfsFileUrlAsync } from "utils";
import styles from "./styles.module.scss";

interface Props {
    isLoading: boolean;
    setLoading: (isLoading: boolean) => void;
}

const SearchSection = ({ isLoading, setLoading }: Props) => {
    const accounts = useEthAccounts();
    const hashStorageContract = useHashStorageContract();

    const [searchFileHash, setSearchFileHash] = useState<string>();
    const [searchedFileDetails, setSearchedFileDetails] = useState<EthDocument>();
    const [isFileSearchError, setFileSearchError] = useState<boolean>(false);

    const onSearch = async () => {
        if (hashStorageContract && accounts && searchFileHash) {
            const file = await getFileFromChainAsync(searchFileHash, hashStorageContract);
            setSearchedFileDetails(file);
            setFileSearchError(!file);
        }
    };

    return (
        <Container title="Wyszukaj hash">
            <>
                <div className={styles["search-section__search-container"]}>
                    <input
                        className={styles["search-section__input"]}
                        onChange={(event) => setSearchFileHash(event.target.value)}
                    />
                    <button
                        className={classNames(styles["search-section__search-button"])}
                        disabled={isLoading || searchFileHash === searchedFileDetails?.fileHash}
                        onClick={onSearch}>
                        Search
                    </button>
                </div>
                {searchedFileDetails && (
                    <div>
                        <h2>Informacje o pliku</h2>
                        <div>DATA WRZUCENIA:{searchedFileDetails.uploadTime.toString()}</div>
                        <div>HASH:{searchedFileDetails.fileHash}</div>
                        <div>IPFS HASH(CID):{searchedFileDetails.ipfsHash}</div>
                        <div>NAZWA PLIKU:{searchedFileDetails.fileName}</div>
                        <div>TYP PLIKU:{searchedFileDetails.fileType}</div>
        
                        
                        <div className={styles["search-section__buttons"]}>
                            {/* <button
                                onClick={async () =>
                                    window.open(
                                        await getIpfsFileUrlAsync(
                                            searchedFileDetails.ipfsHash,
                                            searchedFileDetails.fileType
                                        ),
                                        "_blank"
                                    )
                                }>
                                Browse the file
                            </button> */}
                            <button
                                onClick={async () =>
                                    await downloadIpfsFileAsync(
                                        searchedFileDetails.ipfsHash,
                                        searchedFileDetails.fileName,
                                        searchedFileDetails.fileType
                                    )
                                }>
                                Pobierz
                            </button>
                        </div>
                    </div>
                )}
                {isFileSearchError && (
                    <div>Brak zasobu o podanym hashu.</div>
                )}
            </>
        </Container>
    );
};

export default SearchSection;
