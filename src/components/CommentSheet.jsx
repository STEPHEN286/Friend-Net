import React, { useState, useRef } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { DEFAULT_PROFILE_IMAGE } from '../config/images';

const CommentSheet = ({ postImage, comments = [], onComment }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const timerRef = useRef(null);
  const [commentText, setCommentText] = useState('');

  // Ensure comments is always an array
  const safeComments = Array.isArray(comments) ? comments : [];

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/mp3' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioURL(audioUrl);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      
      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } catch (err) {
      console.error('Error accessing microphone:', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      clearInterval(timerRef.current);
    }
  };

  const cancelRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setAudioURL(null);
      clearInterval(timerRef.current);
      setRecordingTime(0);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmit = () => {
    if (commentText.trim() || audioURL) {
      onComment({ text: commentText, audio: audioURL });
      setCommentText('');
      setAudioURL(null);
      setRecordingTime(0);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button 
          className="flex items-center space-x-2 cursor-pointer text-gray-500 hover:text-gray-700"
          data-sheet-trigger
        >
          <i className="far fa-comment"></i>
          <span>{safeComments.length}</span>
        </button>
      </SheetTrigger>
      <SheetContent 
        side="bottom" 
        className="h-[90vh] p-0 sm:h-[85vh] rounded-t-xl border-t-0 sm:rounded-t-2xl"
      >
        <div className="flex h-full">
          {/* Left side - Post Image (hidden on mobile) */}
          <div className="hidden sm:block w-1/2 bg-black">
            {postImage && (
              <img 
                src={postImage} 
                alt="Post" 
                className="w-full h-full object-contain"
              />
            )}
          </div>

          {/* Right side - Comments */}
          <div className="flex-1 flex flex-col h-full">
            <SheetHeader className="px-4 py-3 border-b">
              <SheetTitle>Comments</SheetTitle>
            </SheetHeader>

            {/* Comments List */}
            <div className="flex-1 overflow-y-auto px-4">
              {safeComments.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <i className="far fa-comments text-4xl mb-2"></i>
                  <p>No comments yet</p>
                  <p className="text-sm">Be the first to comment!</p>
                </div>
              ) : (
                safeComments.map((comment, index) => (
                  <div key={index} className="py-4 flex items-start space-x-3 border-b border-gray-100">
                    <img 
                      src={comment.user?.avatar || DEFAULT_PROFILE_IMAGE} 
                      alt={comment.user?.name} 
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{comment.user?.name || 'Anonymous'}</span>
                        <span className="text-xs text-gray-500">{comment.timestamp}</span>
                      </div>
                      {comment.content && (
                        <p className="text-gray-800 mt-1">{comment.content}</p>
                      )}
                      {comment.audio && (
                        <div className="mt-2 flex items-center space-x-2 bg-gray-100 rounded-full py-2 px-4">
                          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                            <i className="fas fa-play text-white text-xs"></i>
                          </div>
                          <div className="flex-1 h-[18px] bg-blue-200/30"></div>
                          <span className="text-xs text-gray-500">{comment.duration}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Comment Input */}
            <div className="p-4 border-t bg-white">
              {audioURL ? (
                <div className="mb-3">
                  <div className="flex items-center space-x-2 bg-gray-100 rounded-full py-2 px-4">
                    <button 
                      className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center"
                      onClick={() => {
                        const audio = new Audio(audioURL);
                        audio.play();
                      }}
                    >
                      <i className="fas fa-play text-white text-xs"></i>
                    </button>
                    <div className="flex-1 h-[18px] bg-blue-200/30"></div>
                    <span className="text-xs text-gray-500">{formatTime(recordingTime)}</span>
                    <button 
                      onClick={() => setAudioURL(null)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                </div>
              ) : isRecording ? (
                <div className="mb-3">
                  <div className="flex items-center space-x-2 bg-gray-100 rounded-full py-2 px-4">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                    <span className="text-red-500">Recording {formatTime(recordingTime)}</span>
                    <div className="flex-1"></div>
                    <button 
                      onClick={stopRecording}
                      className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center"
                    >
                      <i className="fas fa-check text-gray-700"></i>
                    </button>
                    <button 
                      onClick={cancelRecording}
                      className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center"
                    >
                      <i className="fas fa-times text-gray-700"></i>
                    </button>
                  </div>
                </div>
              ) : null}
              <div className="flex items-center space-x-3">
                <img 
                  src={DEFAULT_PROFILE_IMAGE} 
                  alt="Current User" 
                  className="w-8 h-8 rounded-full"
                />
                <div className="flex-1 flex items-center space-x-2 bg-gray-100 rounded-full px-4 py-2">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="flex-1 bg-transparent text-sm focus:outline-none"
                    disabled={isRecording}
                  />
                  {!isRecording && !audioURL && (
                    <button 
                      onClick={startRecording}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <i className="fas fa-microphone"></i>
                    </button>
                  )}
                </div>
                <button 
                  className={`text-blue-600 font-medium text-sm ${(!commentText.trim() && !audioURL) ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={handleSubmit}
                  disabled={!commentText.trim() && !audioURL}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CommentSheet; 