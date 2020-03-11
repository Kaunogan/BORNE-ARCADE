namespace testanim
{
    partial class Form1
    {
        /// <summary>
        /// Variable nécessaire au concepteur.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Nettoyage des ressources utilisées.
        /// </summary>
        /// <param name="disposing">true si les ressources managées doivent être supprimées ; sinon, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Code généré par le Concepteur Windows Form

        /// <summary>
        /// Méthode requise pour la prise en charge du concepteur - ne modifiez pas
        /// le contenu de cette méthode avec l'éditeur de code.
        /// </summary>
        private void InitializeComponent()
        {
            this.components = new System.ComponentModel.Container();
            this.photosPanel = new System.Windows.Forms.Panel();
            this.timerAnim = new System.Windows.Forms.Timer(this.components);
            this.SuspendLayout();
            // 
            // photosPanel
            // 
            this.photosPanel.BackgroundImage = global::testanim.Properties.Resources.mario;
            this.photosPanel.BackgroundImageLayout = System.Windows.Forms.ImageLayout.Stretch;
            this.photosPanel.Location = new System.Drawing.Point(294, 12);
            this.photosPanel.Name = "photosPanel";
            this.photosPanel.Size = new System.Drawing.Size(180, 180);
            this.photosPanel.TabIndex = 0;
            // 
            // timerAnim
            // 
            this.timerAnim.Tick += new System.EventHandler(this.TimerAnim_Tick);
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 16F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(800, 450);
            this.Controls.Add(this.photosPanel);
            this.Name = "Form1";
            this.Text = "Form1";
            this.KeyDown += new System.Windows.Forms.KeyEventHandler(this.Form1_KeyDown);
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Panel photosPanel;
        private System.Windows.Forms.Timer timerAnim;
    }
}

