import logo from './logo.svg';
import React, { useState, useEffect } from "react";
import './App.css';
import { Container } from "react-bootstrap";

function App() {

  const [country, setCountry] = useState([]);
  const [countryid, setCountryid] = useState('');
  const [project, setProject] = useState([]);
  const [prjid, setprjid] = useState('');
  const prj_name = prjid;
  const z_name = countryid;
  const [stetes, setSat] = useState([]);


  useEffect(() => {
    const getPRJ = async () => {
      const req = await fetch('prj.json');
      const getres = await req.json();
      // console.log(getres);
      setProject(await getres['PRJ_NAME']);

    }
    getPRJ();


  }, []);



  const handleprj = (event) => {
    const prjid = event.target.value;
    setprjid(prjid);
    event.preventDefault();
  }

  useEffect(() => {
    const getcountry = async () => {
      const req = await fetch(`http://202.164.213.67/Digital_pr/pr-permission/zone_name.php?PTYPE=${prj_name}`);
      const getres = await req.json();
      // console.log(getres);
      setCountry(await getres['ZONE_NAME']);

    }
    getcountry();


  }, [prjid]);




  const handlecountry = (event) => {
    const getcoutryid = event.target.value;
    setCountryid(getcoutryid);
    event.preventDefault();
  }

  useEffect(() => {

    const getstate = async () => {
      const resstate = await fetch(`http://202.164.213.67/Digital_pr/PR-permission/branch_name.php?PTYPE=EKOK&&ZONE_CODE=${z_name}`);
      const getst = await resstate.json();

      setSat(await getst['BRANCH_NAME']);

    }
    getstate();

  }, [countryid]);

  return (
    <div className="App">

      <Container className="content">
        <div className="row">
          <div className="col-sm-12">

            <h2>{z_name}{prj_name}</h2>
            <h5 className="mt-4 mb-4 fw-bold">Output  { }</h5>

            <div className="row mb-3">


              <div className="form-group col-md-4">
                <label className="mb-2">Project Name: </label>
                <select name="country" className="form-control" onChange={(e) => handleprj(e)}>
                  <option>Select Project</option>
                  {
                    project.map((getcon) => (
                      <option key={getcon.country_id} value={getcon.country_id}>  {getcon.PRJ_NAME}</option>
                    ))
                  }
                </select>
              </div>
              <div className="form-group col-md-4">
                <label className="mb-2">Zone Name: </label>
                <select name="country" className="form-control" onChange={(e) => handlecountry(e)}>
                  <option>--Select Zone--</option>
                  {
                    country.map((getcon) => (
                      <option key={getcon.country_id} value={getcon.country_id}>  {getcon.OFF_CODE}</option>
                    ))
                  }

                </select>
              </div>
              <div className="form-group col-md-4">
                <label className="mb-2">State</label>
                <select name="state" className="form-control">
                  <option>--Select State--</option>
                  {
                    stetes.map((st, index) => (
                      <option key={index} value={st.state_id}>{st.OFF_NAME}</option>
                    ))
                  }
                </select>
              </div>

              <div className="form-group col-md-2 mt-4">
                <button className="btn btn-success mt-2" >Submit</button>
              </div>
            </div>

          </div>
        </div>
      </Container>

    </div>
  );
}

export default App;
