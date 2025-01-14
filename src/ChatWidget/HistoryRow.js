import { formatDate } from "../utils/CommonFuncs";
const HistoryRow = ({ data, fetchThread }) => {
    return (
        <>
            <div className="chat-history-single-row-container" onClick={fetchThread}>
                <div className="chat-history-single-row-heading">
                    {data.msg}
                </div>
                <div className="chat-history-single-row-time">
                    {
                        data && formatDate(data.created_at)
                    }
                </div>
            </div>
        </>
    );
}
export default HistoryRow;