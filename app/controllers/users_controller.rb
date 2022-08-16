class UsersController < ApplicationController
  before_action :set_post, only: %i[ show edit update destroy ]
  before_action :ensure_frame_response, only: [:new, :edit]

  # GET /posts or /posts.json
  def index
    @users = User.all
  end
  

  # GET /posts/new
  def new
    @user = User.new
  end
  
  # POST /posts or /posts.json
  def create
    @user = User.new(user_params)
    @employment = Employment.new
    respond_to do |format|
      if @user.save
        format.turbo_stream { render turbo_stream: turbo_stream.replace('employment', partial: 'employments/form', locals: {employment: @employment}) }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end
  

  private

    def ensure_frame_response
      return unless Rails.env.development?
      redirect_to root_path unless turbo_frame_request?
    end

    # Only allow a list of trusted parameters through.
    def user_params
      params.require(:user).permit(:first_name, :last_name, :nick_name, :phone_number, :email)
    end
end
