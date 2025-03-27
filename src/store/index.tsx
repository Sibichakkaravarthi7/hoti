import { create } from 'zustand';

const useAppStore = create((set) => ({
  user_token: null,
  user_name: null,
  user_id: null,
  is_authenticated: false,
  user_type: null,
  verified_status: null,
  email: null,
  unreadMessages: 0,
  chatNotification: [],

  // Actions
  setUserAndToken: ({ token, name, id, type, verified_status, email }: { token: string; name: string, id: string, type: string, verified_status: string, email: string }) =>
    set(() => ({
      user_token: token,
      user_name: name,
      user_id: id,
      is_authenticated: true,
      user_type: type,
      verified_status: verified_status,
      email: email,
    })),
  removeUserNameAndToken: () =>
    set(() => ({
      user_token: null,
      user_name: null,
      user_id: null,
      is_authenticated: false,
      verified_status: null,
      email: null,
    })),
  setChatNotification: (newVal: any) =>
    set((state: any) => ({
      chatNotification: [...state.chatNotification, newVal]
    })),
  emptyChatNotification: (newVal: any) =>
    set(() => ({
      chatNotification: []
    })),
  updateUnreadMessage: (newVal: any) =>
    set(() => ({
      unreadMessages: newVal
    })),

}));

export default useAppStore;
