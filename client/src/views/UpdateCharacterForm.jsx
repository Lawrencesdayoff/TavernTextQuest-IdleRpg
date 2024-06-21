import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdateCharacter = (props) => {
  const { id } = useParams();
  const [patientname, setPatientName] = useState("");
  const [age, setPatientAge] = useState("");
  const [symptoms, setPatientSymptoms] = useState("");
  const [invalidform, setSubmitState] = useState();

  const [patientnameError, setPatientNameError] = useState("");
  const [patientageError, setPatientAgeError] = useState("");
  const [symptomError, setSymptomError] = useState("");

  const navigate = useNavigate();

  const gotoPatientManager = (e) => {
    navigate("/patients");
  };

  const handlePatientName = (e) => {
    setPatientName(e);
    if (!e) {
      setPatientNameError("");
    } else if (e.length < 1) {
      setPatientNameError("patient name must be at least 1 characters long");
    } else {
      setPatientNameError(false);
    }
  };
  const handlePatientSymptoms = (e) => {
    setPatientSymptoms(e);
    if (!e) {
      setSymptomError("");
    } else if (e.length < 4) {
      setSymptomError("patient address must be at least 4 characters long");
    } else {
      setSymptomError(false);
    }
  };

  const handlePatientAge = (e) => {
    setPatientAge(e);
    if (!e) {
      setPatientAgeError("Please only enter numbers into the field");
    } else if (Number(age) < 1) {
      console.log(Number(age));
      setPatientAgeError("patient number cannot be negative or zero");
    } else if (Number(age) > 140) {
      console.log(Number(age));
      setPatientAgeError("patients cannot be over 140 years old");
    } else {
      setPatientAgeError(false);
    }
  };

  const isFormValid = () => {
    if (patientnameError || patientageError || symptomError) {
      console.log(invalidform);
      return setSubmitState(true);
    } else if ((patientnameError || patientageError || symptomError) === "") {
      console.log(invalidform);
      return setSubmitState(true);
    } else if (
      patientnameError == (false || "") &&
      patientageError == (false || "") &&
      symptomError == (false || "")
    ) {
      console.log(invalidform);
      return setSubmitState(false);
    } else console.log(invalidform);
    return setSubmitState(true);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:9999/api/getonepatient/${id}`)
      .then((res) => {
        console.log(res.data);
        console.log("recovered book for update");
        setPatientName(res.data.patientname);
        setPatientAge(res.data.age);
        setPatientSymptoms(res.data.symptoms);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const updatePatient = (e) => {
    e.preventDefault();
    if (invalidform == true) {
      navigate("/patient/" + id + "/update");
    } else {
      axios
        .put("http://localhost:9999/api/updatepatient/" + id, {
          patientname,
          age,
          symptoms,
        })
        .then((res) => {
          console.log(res);
          console.log(res.data);
        });
      navigate("/patient/" + id + "/details");
    }
  };

  return (
    <>
      <div>
        <button onClick={gotoPatientManager}> Home </button>
        <h1> Admit Patient </h1>
      </div>

      <form onSubmit={updatePatient}>
        <div>
          <div>
            <label>Patient Name: </label>
            <input
              type="text"
              value={patientname}
              onChange={(e) => {
                handlePatientName(e.target.value);
                isFormValid();
              }}
            />
          </div>
          {patientnameError ? <p>{patientnameError}</p> : ""}

          <div>
            <label>Patient Number: </label>
            <input
              type="number"
              value={age}
              min="1"
              max="140"
              onChange={(e) => {
                handlePatientAge(e.target.value);
                isFormValid();
              }}
            />
          </div>
          {patientageError ? <p>{patientageError}</p> : ""}

          <label>Patient Symptoms: </label>
          <input
            type="text"
            value={symptoms}
            onChange={(e) => {
              handlePatientSymptoms(e.target.value);
              isFormValid();
            }}
          />
        </div>
        {symptomError ? <p>{symptomError}</p> : ""}

        <input type="submit" value="Update Patient" />
      </form>
    </>
  );
};
export default UpdateCharacter;
