import axios from 'axios';

export default {
  namespaced: true,

  state: () => ({
    selectedGroup: -1,
    selectedMember: -1,

    groups: []
  }),

  mutations: {
    ADD_GROUP(state, group) {
      state.groups.push(group);
    },

    ADD_MEMBER(state, groupPrediction, member) {
      const group = state.groups.find(groupPrediction);

      if (group) {
        group.members.push(member);
      } else {
        /**
         * Throw error.
         */
      }
    },

    ADD_ABSENCE(state, { groupPrediction, memberPrediction, absence }) {
      const group = state.groups.find(groupPrediction);

      if (group) {
        const member = group.members.find(memberPrediction);

        if (member) {
          const index = member.absences.findIndex(_absence => _absence.date === absence.date);

          if (index !== -1) {
            member.absences.splice(index, 1);
          }

          member.absences.push(absence);

          const url = this.getters['http/url'];
          const token = localStorage.getItem('token');
    
          axios.post(`${url}/logic/add_absence`, {
            groupId: group._id,
            memberId: member._id,
            absence
          }, {
            headers: {
              token
            }
          }).then(response => {
            
          });
        } else {
          /**
           * Throw error.
           * The member not found.
           */
        }
      } else {
        /**
         * Throw error.
         * The group not found.
         */
      }
    },

    SELECT_GROUP(state, _id) {
      state.selectedGroup = state.groups.find(group => group._id === _id);
    },

    SELECT_MEMBER(state, _id) {
      if (state.selectedGroup) {
        state.selectedMember = state.selectedGroup.members.find(member => member._id === _id);
      } else {
        /**
         * Throw error.
         * The group not found.
         */
      }
    },

    RESET(state) {
      state.groups = [];
      state.selectedGroup = -1;
      state.selectedMember = -1;
    }
  },

  actions: {
    addGroup(context, value) {
      context.commit('ADD_GROUP', value);
    },

    addMember(context, groupPrediction, member) {
      context.commit('ADD_MEMBER', groupPrediction, member);
    },

    addAbsence(context, { groupPrediction, memberPrediction, absence }) {
      context.commit('ADD_ABSENCE', { groupPrediction, memberPrediction, absence });
    },

    selectGroup(context, _id) {
      context.commit('SELECT_GROUP', _id);
    },

    selectMember(context, _id) {
      context.commit('SELECT_MEMBER', _id);
    },

    reset(context) {
      context.commit('RESET');
    }
  },

  getters: {
    groups: (state) => state.groups,
    selectedGroup: (state) => state.selectedGroup,
    selectedMember: (state) => state.selectedMember,
  },
};
