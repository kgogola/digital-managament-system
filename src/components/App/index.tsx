import Main from "components/Main";
import { useState } from "react";
import styles from "./styles.module.scss";

const App = () => {
    const [isLoading, setLoading] = useState(false);

    return (
        <div className={styles["app"]}>
            <Main isLoading={isLoading} setLoading={setLoading} />
        </div>
    );
};

export default App;
