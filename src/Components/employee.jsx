import React from "react";

const employee = () => {
    const [name, setName] = React.useState("");
    const [dept, setDept] = React.useState("");
    const [gender, setGender] = React.useState("");
    const [role, setRole] = React.useState("");
    const [salary, setSalary] = React.useState(0);
    const [empdb, setEmpdb] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const [count,setCount] = React.useState(0);
     React.useEffect(()=>{
         getEmpdb();
     },[page])
     const getEmpdb = () =>{
        fetch('http://localhost:3001/empdb')
        .then((res)=>res.json())
        .then((res)=>setEmpdb(res))
        .catch((err)=> console.log("ERROR"));
    };
    const handleAdd = () => {
        const payload = {
            name: name,
            department: dept,
            gender: gender,
            role: role,
            salary: salary
        }
    }
    const filterDept = (department) =>{
     const updatedDept = empdb.filter((curElem)=>{
         return curElem === department
     });
     setDept(updatedDept);
    }
    setCount(count+1);
    const payLoadjson = JSON.stringify(payload);

    fetch('http://localhost:3001/empdb',{
        method: "POST",
        body: payLoadjson,
        headers: {
            "content-type": "application/json"
        }
    }).then((res)=>{
        getEmpdb();
    });
return(
<>
<input
        placeholder="Add Name"
        value={name}
        onChange = {(e)=>setName(e.target.value)}
        />
        <button onClick={handleAdd}>Add</button>
        <input
        placeholder="Add Department"
        value={dept}
        onChange = {(e)=>setDept(e.target.value)}
        />
        <button onClick={handleAdd}>Add</button>
        <input
        placeholder="Add Gender"
        value={gender}
        onChange = {(e)=>setGender(e.target.value)}
        />
        <button onClick={handleAdd}>Add</button>
        <input
        placeholder="Add Role"
        value={role}
        onChange = {(e)=>setRole(e.target.value)}
        />
        <button onClick={handleAdd}>Add</button>
        <input
        placeholder="Add Salary"
        value={salary}
        onChange = {(e)=>setSalary(e.target.value)}
        />
        <button onClick={handleAdd}>Add</button>
        {empdb.map((item)=>{
            return <><div >
                <h5>Name</h5>{item.name}<br/>
                <h5>Department</h5>{item.dept}<br/>
                <h5>gender</h5>{item.gender}<br/>
                <h5>Role</h5>{item.role}<br/>
                <h5>Salary</h5>{item.same}<br/>
                </div>

                </>
        })}
                        <button onClick={()=>filterDept('marketing')}>Show Marketing</button>
                <button onClick={()=>filterDept('hr')}>Show HR</button>
                <button onClick={()=>filterDept('it')}>Show IT</button>
                <button onClick={()=>filterDept('marketing')}>Show Finance</button>
                <button onClick={()=>setDept(empdb)}>Show All</button>
               
</>

);
};
export {employee};

