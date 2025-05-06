import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  projects: [],
  currentProject: null,
  loading: false,
  error: null,
  milestones: [],
  collaborators: []
};

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    fetchProjectsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchProjectsSuccess: (state, action) => {
      state.loading = false;
      state.projects = action.payload;
    },
    fetchProjectsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setCurrentProject: (state, action) => {
      state.currentProject = action.payload;
      // Reset milestones and collaborators when changing projects
      state.milestones = [];
      state.collaborators = [];
    },
    addProject: (state, action) => {
      state.projects.push(action.payload);
    },
    updateProject: (state, action) => {
      const { id, updates } = action.payload;
      const projectIndex = state.projects.findIndex(project => project.id === id);
      if (projectIndex !== -1) {
        state.projects[projectIndex] = { ...state.projects[projectIndex], ...updates };
        
        // If this is the current project, update that too
        if (state.currentProject && state.currentProject.id === id) {
          state.currentProject = { ...state.currentProject, ...updates };
        }
      }
    },
    deleteProject: (state, action) => {
      state.projects = state.projects.filter(project => project.id !== action.payload);
      
      // If the deleted project is the current project, reset currentProject
      if (state.currentProject && state.currentProject.id === action.payload) {
        state.currentProject = null;
      }
    },
    fetchMilestonesSuccess: (state, action) => {
      state.milestones = action.payload;
    },
    addMilestone: (state, action) => {
      state.milestones.push(action.payload);
    },
    updateMilestone: (state, action) => {
      const { id, updates } = action.payload;
      const milestoneIndex = state.milestones.findIndex(milestone => milestone.id === id);
      if (milestoneIndex !== -1) {
        state.milestones[milestoneIndex] = { ...state.milestones[milestoneIndex], ...updates };
      }
    },
    deleteMilestone: (state, action) => {
      state.milestones = state.milestones.filter(milestone => milestone.id !== action.payload);
    },
    fetchCollaboratorsSuccess: (state, action) => {
      state.collaborators = action.payload;
    },
    addCollaborator: (state, action) => {
      state.collaborators.push(action.payload);
    },
    removeCollaborator: (state, action) => {
      state.collaborators = state.collaborators.filter(collaborator => collaborator.id !== action.payload);
    }
  }
});

export const { 
  fetchProjectsStart, 
  fetchProjectsSuccess, 
  fetchProjectsFailure, 
  setCurrentProject,
  addProject,
  updateProject,
  deleteProject,
  fetchMilestonesSuccess,
  addMilestone,
  updateMilestone,
  deleteMilestone,
  fetchCollaboratorsSuccess,
  addCollaborator,
  removeCollaborator
} = projectsSlice.actions;

export default projectsSlice.reducer;
