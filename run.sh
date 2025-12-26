#!/bin/bash

# NUPCO Chat Widget - Management Script
# مدير تشغيل تطبيق NUPCO Chat Widget

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Helper functions
print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if .env.local exists
check_env() {
    if [ ! -f ".env.local" ]; then
        print_warning ".env.local file not found!"
        print_info "Creating .env.local from .env.example..."
        cp .env.example .env.local
        print_warning "Please edit .env.local and add your OPENAI_API_KEY"
        print_info "You can get an API key from: https://platform.openai.com/api-keys"
        exit 1
    fi

    # Check if API key is set
    if ! grep -q "OPENAI_API_KEY=sk-" .env.local 2>/dev/null; then
        print_warning "OPENAI_API_KEY is not set in .env.local"
        print_info "Please add your OpenAI API key to .env.local"
        exit 1
    fi
}

# Command handler
case "${1:-help}" in
    install)
        print_info "Installing dependencies..."
        npm install
        print_success "Dependencies installed successfully!"
        print_info "Next step: Copy .env.example to .env.local and add your OPENAI_API_KEY"
        ;;

    dev)
        print_info "Starting development server..."
        check_env
        npm run dev
        ;;

    build)
        print_info "Building for production..."
        check_env
        npm run build
        print_success "Build completed successfully!"
        ;;

    start)
        print_info "Starting production server..."
        check_env
        if [ ! -d ".next" ]; then
            print_error "No build found! Run './run.sh build' first"
            exit 1
        fi
        npm start
        ;;

    clean)
        print_info "Cleaning build files..."
        rm -rf .next
        rm -rf node_modules
        print_success "Clean completed!"
        ;;

    help|*)
        echo ""
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        echo "  NUPCO Chat Widget - Management Script"
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        echo ""
        echo "Usage: ./run.sh [command]"
        echo ""
        echo "Commands:"
        echo "  install    Install dependencies (npm install)"
        echo "  dev        Start development server"
        echo "  build      Build for production"
        echo "  start      Start production server"
        echo "  clean      Remove build files and node_modules"
        echo "  help       Show this help message"
        echo ""
        echo "Examples:"
        echo "  ./run.sh install    # First time setup"
        echo "  ./run.sh dev        # Start development"
        echo "  ./run.sh build      # Build for production"
        echo "  ./run.sh start      # Run production server"
        echo ""
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        echo ""
        ;;
esac
