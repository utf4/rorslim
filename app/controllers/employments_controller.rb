class EmploymentsController < ApplicationController
  before_action :ensure_frame_response, only: [:new, :edit]
  
  # GET /posts or /posts.json
  def index
    @employments = Employment.all
  end
  
  # GET /posts/new
  def new
    @employment = Employment.new
  end
  
  # POST /posts or /posts.json
  def create
    @employment = Employment.new(employment_params)
    respond_to do |format|
      if @employment.save
        format.turbo_stream { render turbo_stream: turbo_stream.replace('employment_form', partial: 'users/form', locals: { user: User.new }) }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @employment.errors, status: :unprocessable_entity }
      end
    end
  end
  
  private
    
    def ensure_frame_response
      return unless Rails.env.development?
      redirect_to root_path unless turbo_frame_request?
    end
    
    # Only allow a list of trusted parameters through.
    def employment_params
      params.require(:employment).permit(:employer, :start_date, :end_date)
    end
end