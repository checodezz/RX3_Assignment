import { createSlice, createAsyncThunk, } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchStudents = createAsyncThunk("students/fetchStudents", async () => {
    const response = await axios.get("https://0929b5d1-54be-4d39-9feb-5b1cd3e80e9b-00-1ygdd9xqgx7xd.pike.replit.dev/students");
    // console.log(response.data);
    return response.data
})

export const addStudentsAsync = createAsyncThunk("students/addStudent", async (newStudent) => {
    const response = await axios.post("https://0929b5d1-54be-4d39-9feb-5b1cd3e80e9b-00-1ygdd9xqgx7xd.pike.replit.dev/students", newStudent);
    console.log(response.data)
    return response.data
})

export const updateStudentAsync = createAsyncThunk("students/updateStudent", async ({ studentId, updatedStudent }) => {
    const response = await axios.put(`https://0929b5d1-54be-4d39-9feb-5b1cd3e80e9b-00-1ygdd9xqgx7xd.pike.replit.dev/students/${studentId}`, updatedStudent);
    console.log(response.data);
    return response.data
})

export const deleteStudentAsync = createAsyncThunk("student/deleteStudents", async (studentId) => {
    await axios.delete(`https://0929b5d1-54be-4d39-9feb-5b1cd3e80e9b-00-1ygdd9xqgx7xd.pike.replit.dev/students/${studentId}`);
    return studentId;
})
export const studentSlice = createSlice({
    name: "students",
    initialState: {
        students: [],
        status: "idle",
        error: null,
        filter: "all",
        sortBy: "name",
        schoolStats: {
            totalStudents: 0,
            averageAttendance: 0,
            averageMarks: 0,
            topStudent: null
        }
    },
    reducers: {
        setFilter: (state, action) => {
            state.filter = action.payload
        },

        setSortBy: (state, action) => {
            state.sortBy = action.payload
        },

        setSchoolStats: (state, action) => {
            state.schoolStats = action.payload
        },
        setTopStudent: (state, action) => {
            state.schoolStats.topStudent = action.payload
        }

    },

    extraReducers: (builder) => {
        builder.addCase(fetchStudents.pending, (state) => {
            state.status = "loading"
        });
        builder.addCase(fetchStudents.fulfilled, (state, action) => {
            state.status = 'success';
            state.students = action.payload;
        });
        builder.addCase(fetchStudents.rejected, (state, action) => {
            state.status = "error",
                state.error = action.error.message
        });

        builder.addCase(addStudentsAsync.pending, (state) => {
            state.status = 'loading'
        })

        builder.addCase(addStudentsAsync.fulfilled, (state, action) => {
            state.status = "success",
                state.students.push(action.payload)
        });

        builder.addCase(addStudentsAsync.rejected, (state, action) => {
            state.status = "error",
                state.error = action.error.message
        })

        builder.addCase(updateStudentAsync.pending, (state) => {
            state.status = "loading"
        })

        builder.addCase(updateStudentAsync.fulfilled, (state, action) => {
            const updateStudent = action.payload
            state.status = 'success',
                state.students = state.students.map(student => student._id === updateStudent._id ? updateStudent : student)
        })

        builder.addCase(updateStudentAsync.rejected, (state, action) => {
            state.status = "error",
                state.error = action.error.message
        })

        builder.addCase(deleteStudentAsync.pending, (state) => {
            state.status = "pending"
        })

        builder.addCase(deleteStudentAsync.fulfilled, (state, action) => {
            state.status = "success",
                state.students = state.students.filter(student => student._id !== action.payload)
        })
        builder.addCase(deleteStudentAsync.rejected, (state, action) => {
            state.status = "error";
            state.error = action.error.message;
        });
    }


})

export const { setFilter, setSortBy, setSchoolStats, setTopStudent } = studentSlice.actions;
export default studentSlice.reducer