import ClipLoader from "react-spinners/ClipLoader";

export const SpinnerCarga = ({loading}) => {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center Spinner">
        <ClipLoader color="#f4ae2b" size={150} loading = {loading}/>
      </div>
    </>
  )
}
