"use client";

import React, { ErrorInfo, useState, ReactNode } from "react";

import Modal from "@/components/modal";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class VideoErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    this.setState({ hasError: true, error });
  }

  handleCloseModal = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <>
        {this.props.children}
        <Modal isOpen={this.state.hasError} onClose={this.handleCloseModal}>
          <div className="p-4">
            <p className="text-red-600">{this.state.error?.message}</p>
          </div>
        </Modal>
      </>
    );
  }
}

export default VideoErrorBoundary;
