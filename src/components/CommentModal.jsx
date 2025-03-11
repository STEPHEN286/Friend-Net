import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setModalOpen, selectIsModalOpen } from '../store/features/userSlice';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { DEFAULT_PROFILE_IMAGE } from '../config/images';

const CommentModal = ({ post }) => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector(selectIsModalOpen);
  const [activeTab, setActiveTab] = useState('view'); // 'view' or 'add'
  const [comment, setComment] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [selectedReaction, setSelectedReaction] = useState(null);
  
  // Sample comments data - replace with actual data from your state management
  const sampleComments = [
    {
      id: 1,
      author: {
        name: 'Sarah Johnson',
        image: DEFAULT_PROFILE_IMAGE,
      },
      text: "This is such an inspiring post! Love the perspective you've shared.",
      reaction: '❤️',
      timestamp: '2 hours ago',
    },
    {
      id: 2,
      author: {
        name: 'Mike Chen',
        image: DEFAULT_PROFILE_IMAGE,
      },
      text: 'Great insights! Would love to collaborate on similar projects.',
      reaction: '👍',
      timestamp: '1 hour ago',
      hasAudio: true,
    },
  ];
  
  const reactions = ['👍', '❤️', '😂', '😮', '😢', '😡'];

  const handleClose = () => {
    dispatch(setModalOpen(false));
    setComment('');
    setAudioURL(null);
    setSelectedReaction(null);
    setActiveTab('view');
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks = [];

      recorder.ondataavailable = (e) => {
        chunks.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' });
        const url = URL.createObjectURL(blob);
        setAudioURL(url);
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
    } catch (err) {
      console.error('Error accessing microphone:', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if ((!comment.trim() && !audioURL) || !selectedReaction) return;

    console.log('Submitting comment:', {
      text: comment,
      audio: audioURL,
      reaction: selectedReaction
    });
    
    handleClose();
  };

  const CommentsList = () => (
    <div className="space-y-4">
      {sampleComments.map((comment) => (
        <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <img
              src={comment.author.image}
              alt={comment.author.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div className="font-medium">{comment.author.name}</div>
                <span className="text-sm text-gray-500">{comment.timestamp}</span>
              </div>
              <p className="text-gray-700 mt-1">{comment.text}</p>
              {comment.hasAudio && (
                <div className="mt-2">
                  <audio controls className="w-full h-8" />
                </div>
              )}
              <div className="mt-2 flex items-center justify-between">
                <span className="text-2xl">{comment.reaction}</span>
                <button className="text-sm text-gray-500 hover:text-gray-700">
                  Reply
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[800px] outline-0 border-0 bg-white p-0 overflow-hidden">
        <div className="flex h-[600px]">
          {/* Left side - Post Image */}
          <div className="w-1/2 bg-gray-100">
            <img
              src={post?.image}
              alt="Post content"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right side - Comments Section */}
          <div className="w-1/2 flex flex-col">
            <DialogHeader className="p-4 border-b">
              <div className="flex items-center justify-between">
                <DialogTitle>Comments</DialogTitle>
                <div className="flex space-x-1">
                  <button
                    onClick={() => setActiveTab('view')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === 'view'
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    View
                  </button>
                  <button
                    onClick={() => setActiveTab('add')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === 'add'
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    Add Comment
                  </button>
                </div>
              </div>
            </DialogHeader>
            
            <div className="p-4 flex-1 overflow-y-auto">
              {activeTab === 'view' ? (
                <CommentsList />
              ) : (
                <>
                  <div className="flex items-start space-x-3 mb-4">
                    <img
                      src={DEFAULT_PROFILE_IMAGE}
                      alt="Current user"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-medium">Current User</div>
                      <div className="text-sm text-gray-500">
                        Commenting on {post?.author?.name}'s post
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Write your comment..."
                      className="w-full p-3 bg-gray-100 rounded-lg border-none text-sm resize-none focus:ring-2 focus:ring-blue-500/20"
                      rows={3}
                    />

                    {/* Voice Recording Section */}
                    <div className="space-y-2">
                      <div className="flex items-center space-x-4">
                        <button
                          type="button"
                          onClick={isRecording ? stopRecording : startRecording}
                          className={`p-2 rounded-full ${isRecording ? 'bg-red-500' : 'bg-blue-600'} text-white hover:opacity-90`}
                        >
                          <i className={`fas ${isRecording ? 'fa-stop' : 'fa-microphone'}`}></i>
                        </button>
                        {isRecording && (
                          <span className="text-sm text-red-500 animate-pulse">
                            Recording...
                          </span>
                        )}
                      </div>
                      {audioURL && (
                        <div>
                          <audio controls src={audioURL} className="w-full" />
                        </div>
                      )}
                    </div>

                    {/* Reactions Section */}
                    <div>
                      <h4 className="text-sm font-semibold mb-2">Add a reaction</h4>
                      <div className="flex space-x-2">
                        {reactions.map((reaction) => (
                          <button
                            key={reaction}
                            type="button"
                            onClick={() => setSelectedReaction(reaction)}
                            className={`p-2 text-2xl hover:bg-gray-100 rounded-lg ${
                              selectedReaction === reaction ? 'bg-gray-100' : ''
                            }`}
                          >
                            {reaction}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2">
                      <button
                        type="button"
                        onClick={handleClose}
                        className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={(!comment.trim() && !audioURL) || !selectedReaction}
                        className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Post Comment
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommentModal; 