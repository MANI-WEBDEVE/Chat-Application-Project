export const createChatSlice = (set, get) => ({
  selectedChatType: undefined,
  selectedChatData: undefined,
  selectedChatMessage: [],
  directMessageContact: [],
  // channel slice
  channels:[],
  setChannels: (channels) => set({ channels }),
  // file upload and download states
  isUploading: false,
  isDownloading: false,
  fileUploadProgress: 0,
  fileDownloadProgress: 0,
  setIsUploading: (isUploading) => set({ isUploading }),
  setIsDownloading: (isDownloading) => set({ isDownloading }),
  setFileUploadProgress: (fileUploadProgress) => set({ fileUploadProgress }),
  setFileDownloadProgress: (fileDownloadProgress) => set({ fileDownloadProgress }),
  //---------------------------------------------------------------------------
  setSelectedChatType: (selectedChatType) => set({ selectedChatType }),
  setSelectedChatData: (selectedChatData) => set({ selectedChatData }),
  setSelectedChatMessage: (selectedChatMessage) => set({ selectedChatMessage }),



  setDirectMessageContact: (directMessageContact) =>
    set({ directMessageContact }),
  // TODO: implement the code to add the new contact to the existing list
  addDirectMessageContact: (newContact) => {
    const directMessageContact = get().directMessageContact;
    const newContactList = [...directMessageContact, newContact];
    set({ directMessageContact: newContactList });
  },

  addChannel: (channel) => {
    try {
      const channels = get().channels || [];
      console.log('Current channels:', channels);
      console.log('Adding new channel:', channel);
      set({channels: [channel, ...channels]});
      console.log('Updated channels:', get().channels);
    } catch (error) {
      console.error('Error adding channel:', error);
    }
  },
  


  closeChat: () =>
    set({
      selectedChatData: undefined,
      selectedChatType: undefined,
      selectedChatMessage: [],
    }),
  addMessage: (message) => {
    const selectedChatMessage = get().selectedChatMessage;
    const selectedChatType = get().selectedChatType;

    set({
      selectedChatMessage: [
        ...selectedChatMessage,
        {
          ...message,
          recipient:
            selectedChatType === "channel"
              ? message.recipient
              : message.recipient._id,
          sender:
            selectedChatType === "channel"
              ? message.sender
              : message.sender._id,
        },
      ],
    });
  },
  addChannelMessageList: (message) => {
    const channels = get().channels;
    const data = channels.find((channel) => channel._id === message.channelId)
    const index = channels.findIndex((channel) => channel._id === message.channelId);
    if (index !== -1 && index !== undefined) {
      channels.splice(index, 1);
      channels.unshift(data);
    }
  },
  addContactInDMList:(message) => {
    const userId = get().userInfo.id;
    const fromId = message.sender._id === userId ? message.recipient._id : message.sender._id;  
    const fromData = message.sender._id === userId ? message.recipient : message.sender;
    const dmContact = get().directMessageContact;
    const data = dmContact.find((contact) => contact._id === fromId);
    const index = dmContact.findIndex((contact) => contact._id === fromId);
    if (index !== -1 && index !== undefined) {
      dmContact.splice(index, 1);
      dmContact.unshift(data);
    }else {
      dmContact.unshift(fromData);
    }
    set({directMessageContact: dmContact})
  }
});
