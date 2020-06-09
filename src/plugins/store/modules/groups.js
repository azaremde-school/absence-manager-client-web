import axios from 'axios';
import generateId from '@/util/generate-id';

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
      if (_id === -1) {
        state.selectedMember = -1;
        return;
      }

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
    },

    EDIT_GROUP(state, changes) {
      const groupId = changes.group;

      const group = state.groups.find(g => g._id === groupId);

      const membersToRemove = changes.oldMembers.filter(m => m.removed);

      var removedIds = [];
      var newMembers = [];

      for (var i = 0; i < membersToRemove.length; i++) {
        const index = group.members.findIndex(m => m._id === membersToRemove[i]._id);

        if (index !== -1) {
          group.members.splice(index, 1);
          removedIds.push(membersToRemove[i]._id);
          i = 0;
        }
      }

      const membersToAdd = changes.newMembers;

      for (var i = 0; i < membersToAdd.length; i++) {
        const _id = generateId({ length: 22 });

        newMembers.push({
          name: membersToAdd[i].name,
          _id
        });
        group.members.push({
          _id,
          name: membersToAdd[i].name,
          absences: []
        });
      }

      const url = this.getters['http/url'];
      const token = localStorage.getItem('token');

      axios.post(`${url}/logic/edit_group`, {
        groupId,
        removedIds,
        newMembers
      }, {
        headers: {
          token
        }
      }).then(response => {
        
      });
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
    },

    editGroup(context, changes) {
      context.commit('EDIT_GROUP', changes);
    }
  },

  getters: {
    groups: (state) => state.groups,
    selectedGroup: (state) => state.selectedGroup,
    selectedMember: (state) => state.selectedMember,
    noGroups: (state) => state.groups.length === 0,
    noGroupSelected: (state) => state.selectedGroup === -1 || !state.selectedGroup,
    noMemberSelected: (state) => state.selectedMember === -1 || !state.selectedMember
  },
};
